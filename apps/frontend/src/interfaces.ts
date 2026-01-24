interface FeatureColumnProps {
	title: string;
	text: string;
	hasBorder?: boolean;
}

interface UseGoogleAuthHook {
	googleSignInMutation: () => Promise<void>;
	signOut: () => Promise<void>;
}

export type { FeatureColumnProps, UseGoogleAuthHook };
