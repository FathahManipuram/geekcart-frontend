import HomePage from "@/features/user-side/home/pages/HomePage";
import MainLayout from "@/shared/layout/MainLayout";


const publicRoutes= {
	path: "/",
	element: <MainLayout/>,

	children: [
		{
			index: true,
			element: <HomePage/>
		},
	]
}

export default publicRoutes