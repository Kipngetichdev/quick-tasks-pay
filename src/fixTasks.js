import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc, deleteField } from 'firebase/firestore';

// Firebase configuration (replace with your Firebase project config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const cleanTasks = async () => {
  try {
    const tasksSnapshot = await getDocs(collection(db, 'tasks'));
    let cleanedCount = 0;
    for (const taskDoc of tasksSnapshot.docs) {
      const data = taskDoc.data();
      if (data.status === 'applied' || data.assignedTo) {
        await updateDoc(doc(db, 'tasks', taskDoc.id), {
          assignedTo: deleteField(),
          status: data.status === 'applied' ? 'open' : data.status,
        });
        console.log(`Cleaned task ${taskDoc.id}: status=${data.status}, assignedTo=${data.assignedTo}`);
        cleanedCount++;
      }
    }
    console.log(`Cleanup complete. Cleaned ${cleanedCount} tasks.`);
  } catch (error) {
    console.error('Error cleaning tasks:', error);
  }
};

cleanTasks();