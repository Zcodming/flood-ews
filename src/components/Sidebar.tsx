import { authOptions } from "@/library/auth";
import { getServerSession } from "next-auth";
import MenuToggler from "./MenuToggler";

const Sidebar = async () => {
	const session = await getServerSession(authOptions);

	return (
		<>
			{session ? (
				<>
					{/** Menu Toggler */}
					<MenuToggler />
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
