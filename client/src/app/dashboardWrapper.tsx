"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import AuthProvider from "./authProvider";
import StoreProvider, { useAppSelector } from "./redux";
import { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const isSidebarCollapsed = useAppSelector(
		(state) => state.global.isSidebarCollapsed,
	);

	const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDarkMode]);

	return (
		<div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
			<Sidebar />
			<main
				className={`dark:bg-dark-bg flex w-full flex-col bg-gray-50 ${
					isSidebarCollapsed ? "" : "md:pl-64"
				}`}
			>
				<Navbar />
				{children}
			</main>
		</div>
	);
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<AuthProvider>
			<StoreProvider>
				<DashboardLayout>{children}</DashboardLayout>;
			</StoreProvider>
		</AuthProvider>
	);
};

export default DashboardWrapper;
