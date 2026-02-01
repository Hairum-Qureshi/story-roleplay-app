import React from 'react'
import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/useCurrentUser';

export default function OwnerRoutesGuard({
	children
}: {
	children: React.ReactNode;
}) {
	const { data: currUserData, isPending } = useCurrentUser();
    // get the specific ad data from the custom hook and then check if the author ID matches the current user ID

   
	
	return <>{children}</>;
}
