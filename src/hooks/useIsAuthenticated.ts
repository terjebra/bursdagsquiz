import { useEffect, useState } from "react";
import { supabase } from "../auth/supabaseclient";

export const useIsAuthenticated = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

	useEffect(() => {
		const checkAuth = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setIsAuthenticated(!!session);
		};
		checkAuth();
	}, []);

	return isAuthenticated;
};
