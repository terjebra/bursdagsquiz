import { useEffect, useState } from "react";
import { supabase } from "../auth/supabaseclient";

export const useAccessToken = () => {
	const [accessToken, setAccessToken] = useState<string | null>(null);

	useEffect(() => {
		const getSession = async () => {
			const session = await supabase.auth.getSession();
			setAccessToken(session?.data.session?.access_token || null);
		};
		getSession();
	}, []);

	return accessToken;
};
