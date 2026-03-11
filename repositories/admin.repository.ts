import db from "@/lib/firebase"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"

export const getContentRepo = async () => {

    const ref = doc(db, "portfolio", "website");
    //  console.log({ref}); 
    const snap = await getDoc(ref);
    // console.log({snapLPOIGH:snap});
    return snap.data()

}

export const updateContentRepo = async (data: any) => {

    try {
        // console.log(data)
        const ref = doc(db, "portfolio", "website")

        const setData = await setDoc(ref, data);
        return true;

    } catch (error) {
        console.error("FIREBASE UPLOAD ERROR", error);
        throw new Error();
    }


}