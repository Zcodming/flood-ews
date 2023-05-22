import { authOptions } from "@/library/auth";
import { getServerSession } from "next-auth";
import MenuToggler from "./MenuToggler";

const Sidebar = async () => {
	const session = await getServerSession(authOptions);
	let isAdmin = true;

	if (session?.user.role !== "ADMIN") {
		isAdmin = false;
	}
	return (
		<>
			{session ? (
				<>
					{/** Menu Toggler */}
					<MenuToggler isAdmin={isAdmin} />
				</>
			) : (
				<>
					<div className="hidden"></div>
				</>
			)}
		</>
	);
};

export default Sidebar;
