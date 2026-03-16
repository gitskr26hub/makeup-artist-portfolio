import db from "@/lib/firebase";
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";

const COLLECTION = "portfolio";
const DOCUMENT = "website";

export const getContentRepo = async () => {
    try {
        const ref = doc(db, COLLECTION, DOCUMENT);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
            console.warn("Content document does not exist");
            return null;
        }

        return snap.data();
    } catch (error) {
        console.error("FIREBASE FETCH ERROR:", error);
        throw new Error("Failed to fetch website content");
    }
};

export const updateContentRepo = async (data: any) => {
    try {
        if (!data || typeof data !== "object") {
            throw new Error("Invalid data payload");
        }

        const ref = doc(db, COLLECTION, DOCUMENT);

        await setDoc(
            ref,
            {
                ...data,
                updatedAt: serverTimestamp(),
            },
            { merge: true }
        );

        return true;
    } catch (error) {
        console.error("FIREBASE UPDATE ERROR:", error);
        throw new Error("Failed to update website content");
    }
   
};

export const updateSectionRepo = async (
    field: string,
    value: any
) => {
    try {
        const ref = doc(db, COLLECTION, DOCUMENT);

        await updateDoc(ref, {
            [field]: value,
            updatedAt: serverTimestamp(),
        });

        return true;
    } catch (error) {
        console.error("FIREBASE SECTION UPDATE ERROR:", error);
        throw new Error("Failed to update section");
    }
};