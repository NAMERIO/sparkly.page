import { validateRequest } from "@/lib/auth";
import { Wrapper } from "./_components/wrapper";

export default async function Page() {
	const { user } = await validateRequest();

	if (!user) return <div>Loading...</div>;

	return <Wrapper user={user} />;
}
