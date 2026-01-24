import { signInWithPopup } from "@firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UseGoogleAuthHook {
	googleSignInMutation: () => Promise<void>;
}

export default function useGoogleAuth(): UseGoogleAuthHook {
	const navigate = useNavigate();

	const handleGoogleSignIn = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			const token = await result.user.getIdToken();
			return token;
		} catch (error) {
			console.log(error);
		}
	};

	const googleSignInMutation = async () => {
		const token = await handleGoogleSignIn();
		await axios.post(
			`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/google/sign-in`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`
				},
				withCredentials: true
			}
		);

		navigate("/profile");
	};

	return { googleSignInMutation };
}
