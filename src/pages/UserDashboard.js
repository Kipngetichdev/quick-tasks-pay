import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../services/firebase';
import { doc, onSnapshot, updateDoc, serverTimestamp, increment } from 'firebase/firestore';
import { Trophy, Zap, Target, Crown, Clock, DollarSign, Calendar, LogOut, Star, Shield, Rocket, CheckCircle, ChevronRight } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import Confetti from 'react-confetti';
import 'react-toastify/dist/ReactToastify.css';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [dailyTasksRemaining, setDailyTasksRemaining] = useState(2);
  const [myTasks, setMyTasks] = useState([]);
  const [showVIPModal, setShowVIPModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const availableTasks = [
    { id: 'task1', title: 'Translate English Marketing Slogans to Spanish', category: 'Translation', paymentAmount: 18, duration: '45 mins', difficulty: 'Intermediate', requirements: ['Native Spanish', 'Marketing experience'] },
    { id: 'task2', title: 'Write Product Descriptions for Smart Home Devices', category: 'Content Writing', paymentAmount: 22, duration: '1 hour', difficulty: 'Advanced', requirements: ['SEO knowledge', 'Creative writing'] },
    { id: 'task3', title: 'Label Safety Hazards in Urban Street Images', category: 'Data Labeling', paymentAmount: 15, duration: '30 mins', difficulty: 'Beginner', requirements: ['Attention to detail'] },
    { id: 'task4', title: 'Classify Emotional Sentiment in Family Photos', category: 'Image Classification', paymentAmount: 20, duration: '40 mins', difficulty: 'Intermediate', requirements: ['Psychology background preferred'] },
    { id: 'task5', title: 'Translate Swahili Proverbs to English (Cultural Nuances)', category: 'Translation', paymentAmount: 25, duration: '1 hour 15 mins', difficulty: 'Expert', requirements: ['Native Swahili + English fluency'] },
    { id: 'task6', title: 'Write 5 Viral TikTok Scripts About AI Tools', category: 'Content Writing', paymentAmount: 30, duration: '2 hours', difficulty: 'Advanced', requirements: ['TikTok trending knowledge', 'Scriptwriting'] }
  ];

  const getNextThursday = () => {
    const now = new Date();
    const thursday = new Date(now);
    thursday.setDate(now.getDate() + ((4 - now.getDay() + 7) % 7 || 7));
    thursday.setHours(23, 59, 59, 0);
    return thursday;
  };

  const [timeLeft, setTimeLeft] = useState(getNextThursday() - new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = getNextThursday() - new Date();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (ms) => {
    const days = Math.floor(ms / 86400000);
    const hours = Math.floor((ms % 86400000) / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    if (!currentUser) return;

    const unsub = onSnapshot(doc(db, 'users', currentUser.uid), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserProfile(data);

        const today = new Date().toDateString();
        const lastReset = data.lastTaskResetDate?.toDate?.()?.toDateString();
        const isVIP = data.isVIP || false;
        const maxTasks = isVIP ? 10 : 2;

        if (lastReset !== today) {
          updateDoc(doc(db, 'users', currentUser.uid), {
            dailyTasksRemaining: maxTasks,
            lastTaskResetDate: serverTimestamp()
          });
          setDailyTasksRemaining(maxTasks);
        } else {
          setDailyTasksRemaining(data.dailyTasksRemaining ?? maxTasks);
        }
      }
    });

    const saved = localStorage.getItem(`myTasks_${currentUser.uid}`);
    if (saved) {
      const tasks = JSON.parse(saved);
      setMyTasks(tasks);
    }

    return () => unsub();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && myTasks.length > 0) {
      localStorage.setItem(`myTasks_${currentUser.uid}`, JSON.stringify(myTasks));
    }
  }, [myTasks, currentUser]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMyTasks(prev => {
        let updated = false;
        const newTasks = prev.map(task => {
          if (task.status === 'completed' && !task.approvalScheduled) {
            task.approvalScheduled = Date.now() + (Math.random() * 240000 + 60000);
            updated = true;
          }

          if (task.approvalScheduled && Date.now() >= task.approvalScheduled && task.status !== 'approved') {
            task.status = 'approved';
            task.approvedAt = new Date();
            updated = true;

            updateDoc(doc(db, 'users', currentUser.uid), {
              balance: increment(task.paymentAmount),
              thisMonthEarned: increment(task.paymentAmount),
              totalEarned: increment(task.paymentAmount),
              completedTasks: increment(1)
            });

            toast.success(`Task approved! +$${task.paymentAmount} added`, {
              icon: <DollarSign className="w-6 h-6 text-green-400" />
            });
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
          }
          return task;
        });

        if (updated) {
          localStorage.setItem(`myTasks_${currentUser.uid}`, JSON.stringify(newTasks));
        }
        return newTasks;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentUser]);

  const startTask = async (task) => {
    const isVIP = userProfile?.isVIP || false;
    const usedToday = myTasks.filter(t => 
      new Date(t.startedAt).toDateString() === new Date().toDateString()
    ).length;

    const maxAllowed = isVIP ? 10 : 2;

    if (usedToday >= maxAllowed) {
      setShowVIPModal(true);
      return;
    }

    const newTask = {
      id: `${task.id}_${Date.now()}`,
      ...task,
      status: 'in-progress',
      startedAt: new Date(),
      completedQuestions: 0,
      totalQuestions: 4
    };

    setMyTasks(prev => [...prev, newTask]);
    setDailyTasksRemaining(prev => Math.max(0, prev - 1));

    toast.success(`Started: ${task.title}`);
    navigate('/working', { state: { task } });
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <p className="text-2xl text-white">Please sign in</p>
      </div>
    );
  }

  const todayTasks = myTasks.filter(t => 
    new Date(t.startedAt).toDateString() === new Date().toDateString()
  );

  const activeCount = todayTasks.filter(t => t.status === 'in-progress').length;
  const completedCount = todayTasks.filter(t => t.status === 'completed').length;
  const approvedCount = todayTasks.filter(t => t.status === 'approved').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}

      <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-amber-400">Train2Earn</h1>
            <p className="text-sm text-blue-100">Welcome, {userProfile?.name || 'User'}</p>
          </div>
          <button
            onClick={() => auth.signOut().then(() => { localStorage.clear(); navigate('/signin'); })}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-white hover:bg-white/20"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Balance */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-amber-400/30">
            <p className="text-blue-100">Balance</p>
            <p className="text-5xl font-black text-amber-400">${(userProfile?.balance || 0).toFixed(2)}</p>
            <button className="mt-4 bg-amber-400 text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition">
              Withdraw
            </button>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-amber-400/30">
            <p className="text-blue-100 flex items-center gap-2"><Calendar className="w-5 h-5" /> Next Payout</p>
            <p className="text-3xl font-black text-white">{formatTime(timeLeft)}</p>
            <p className="text-sm text-blue-200">Every Thursday</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 rounded-3xl p-6 text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-white">{userProfile?.streak || 0}</p>
            <p className="text-sm text-blue-200">Streak</p>
          </div>
          <div className="bg-white/10 rounded-3xl p-6 text-center">
            <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-white">{activeCount + completedCount + approvedCount} / {userProfile?.isVIP ? 10 : 2}</p>
            <p className="text-sm text-blue-200">Tasks Today</p>
          </div>
          <div className="bg-white/10 rounded-3xl p-6 text-center">
            <Crown className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-white">{dailyTasksRemaining}</p>
            <p className="text-sm text-blue-200">Tasks Left</p>
          </div>
          <div className="bg-white/10 rounded-3xl p-6 text-center">
            <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-white">{availableTasks.length}</p>
            <p className="text-sm text-blue-200">Available</p>
          </div>
        </div>

        {/* Available Tasks */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-black text-white mb-6">Available Tasks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableTasks.map(task => (
              <div key={task.id} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-amber-400/50 transition">
                <div className="flex justify-between mb-4">
                  <span className="text-xs bg-blue-500/20 px-3 py-1 rounded-full text-blue-300">
                    {task.category}
                  </span>
                  <span className="text-2xl font-black text-amber-400">${task.paymentAmount}</span>
                </div>
                <h3 className="font-bold text-white mb-3">{task.title}</h3>
                <button
                  onClick={() => startTask(task)}
                  className={`w-full py-3 rounded-xl font-bold transition ${
                    dailyTasksRemaining > 0
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:scale-105'
                      : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  }`}
                  disabled={dailyTasksRemaining === 0}
                >
                  {dailyTasksRemaining > 0 ? 'Start Task' : 'Upgrade to VIP'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* TODAY'S PROGRESS – BEAUTIFUL & FIXED */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-purple-600/10 border-b border-amber-400/30 px-8 py-7">
            <h2 className="text-3xl font-black text-white flex items-center gap-3">
              <Zap className="w-9 h-9 text-amber-400 animate-pulse" />
              Today's Progress
            </h2>
            <p className="text-blue-200 mt-1 text-sm font-medium">Real-time tracking • Auto-approval in 1–5 mins</p>
          </div>

          <div className="p-8 space-y-12">

            {/* ACTIVE TASKS */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-amber-300 flex items-center gap-3">
                  <div className="w-4 h-4 bg-amber-400 rounded-full animate-ping"></div>
                  <span>Active Tasks</span>
                </h3>
                <div className="text-4xl font-black text-white tabular-nums">{activeCount}</div>
              </div>

              {activeCount === 0 ? (
                <div className="text-center py-16 bg-white/5 rounded-3xl border-2 border-dashed border-amber-400/30">
                  <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Clock className="w-12 h-12 text-amber-400" />
                  </div>
                  <p className="text-xl text-amber-300 font-semibold">No active tasks</p>
                  <p className="text-blue-300 mt-2">Pick one from Available Tasks to get started!</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {todayTasks
                    .filter(t => t.status === 'in-progress')
                    .map((task) => (
                      <div
                        key={task.id}
                        className="group bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-transparent border border-amber-400/40 rounded-3xl p-6 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-400/20 transition-all duration-400"
                      >
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="px-4 py-1.5 text-xs font-bold bg-amber-400/20 text-amber-300 rounded-full border border-amber-400/50">
                                {task.category}
                              </span>
                              <span className="text-3xl font-black text-amber-400">${task.paymentAmount}</span>
                            </div>
                            <h4 className="text-xl font-bold text-white group-hover:text-amber-100 transition">
                              {task.title}
                            </h4>
                            <p className="text-sm text-blue-300 mt-1">
                              Started at {new Date(task.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          <button
                            onClick={() => navigate('/working', { state: { task } })}
                            className="px-7 py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold rounded-2xl hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap"
                          >
                            Continue
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="mt-5">
                          <div className="flex justify-between text-xs text-blue-300 mb-2">
                            <span>Question progress</span>
                            <span className="font-bold">{task.completedQuestions || 0} / 4</span>
                          </div>
                          <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/20">
                            <div
                              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-1000 ease-out"
                              style={{ width: `${((task.completedQuestions || 0) / 4) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* AWAITING APPROVAL */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-orange-300 flex items-center gap-3">
                  <Clock className="w-7 h-7 animate-spin-slow text-orange-400" />
                  Awaiting Approval
                </h3>
                <div className="text-4xl font-black text-white tabular-nums">{completedCount}</div>
              </div>

              {completedCount === 0 ? (
                <div className="text-center py-14 bg-white/5 rounded-3xl border-2 border-dashed border-orange-400/30">
                  <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Clock className="w-12 h-12 text-orange-400" />
                  </div>
                  <p className="text-xl text-orange-300 font-semibold">All caught up!</p>
                  <p className="text-blue-300 mt-2">No tasks waiting for review</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {todayTasks
                    .filter(t => t.status === 'completed')
                    .map(task => {
                      const minutesLeft = Math.max(1, Math.ceil((task.approvalScheduled - Date.now()) / 60000));
                      return (
                        <div key={task.id} className="bg-gradient-to-br from-orange-500/10 to-red-600/10 border border-orange-400/50 rounded-3xl p-6 text-center hover:border-orange-400 transition">
                          <div className="text-4xl font-black text-orange-400">${task.paymentAmount}</div>
                          <p className="text-sm text-orange-200 mt-2 font-medium">Approval in ~{minutesLeft} min</p>
                          <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-1000" style={{ width: `${100 - (minutesLeft / 5) * 100}%` }} />
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* APPROVED & PAID */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-green-300 flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  Approved & Paid
                </h3>
                <div className="text-4xl font-black text-green-400">
                  ${todayTasks.filter(t => t.status === 'approved').reduce((sum, t) => sum + t.paymentAmount, 0).toFixed(2)}
                </div>
              </div>

              {approvedCount === 0 ? (
                <div className="text-center py-14 bg-white/5 rounded-3xl border-2 border-dashed border-green-400/30">
                  <DollarSign className="w-20 h-20 text-green-400/30 mx-auto mb-5" />
                  <p className="text-xl text-green-300 font-semibold">No earnings yet</p>
                  <p className="text-blue-300 mt-2">Complete tasks to see money flow in!</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {todayTasks
                    .filter(t => t.status === 'approved')
                    .map(task => (
                      <div key={task.id} className="bg-gradient-to-br from-green-500/20 via-emerald-600/20 to-teal-600/20 border border-green-400/60 rounded-3xl px-7 py-5 flex items-center gap-5 hover:shadow-2xl hover:shadow-green-400/30 transition">
                        <div className="w-14 h-14 bg-green-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-9 h-9 text-green-400" />
                        </div>
                        <div>
                          <p className="text-2xl font-black text-white">+${task.paymentAmount}</p>
                          <p className="text-xs text-green-200">
                            Paid {new Date(task.approvedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Summary Footer */}
          <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-green-500/10 border-t border-white/20 px-8 py-7">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
              <div className="flex items-center gap-5">
                <Target className="w-10 h-10 text-amber-400" />
                <div>
                  <p className="text-sm text-blue-200 font-medium">Daily Limit</p>
                  <p className="text-3xl font-black">
                    {activeCount + completedCount + approvedCount} / {userProfile?.isVIP ? 10 : 2}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-200 font-medium">Today's Total Earnings</p>
                <p className="text-4xl font-black text-green-400">
                  ${todayTasks.filter(t => t.status === 'approved').reduce((sum, t) => sum + t.paymentAmount, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* VIP Modal */}
      {showVIPModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-8 max-w-md w-full border border-purple-500">
            <Crown className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h2 className="text-3xl font-black text-white text-center mb-4">Go VIP – Earn 5x Faster!</h2>
            <div className="space-y-3 text-purple-100 mb-6">
              <p><Star className="inline w-5 h-5 text-yellow-400" /> 10 tasks per day</p>
              <p><Rocket className="inline w-5 h-5 text-green-400" /> Priority access</p>
              <p><Shield className="inline w-5 h-5 text-blue-400" /> Instant withdrawals</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowVIPModal(false)} className="flex-1 py-3 bg-white/10 rounded-xl text-white">
                Later
              </button>
              <button onClick={() => { toast.success('VIP coming soon!'); setShowVIPModal(false); }} className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold text-white">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
};

export default UserDashboard;