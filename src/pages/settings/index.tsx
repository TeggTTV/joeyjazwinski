import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, Smartphone, Key } from 'lucide-react';
import { toast } from 'react-toastify';
import { NextSeo } from 'next-seo'; // Assumed dependency.

const SettingsPage = () => {
	// This state would ideally be fetched from and saved to a user profile API
	const [notifications, setNotifications] = useState({
		emailCourses: true,
		weeklyDigest: false,
		securityAlerts: true,
	});

	const handleNotificationChange = (key: keyof typeof notifications) => {
		setNotifications((prev) => {
			const newState = { ...prev, [key]: !prev[key] };
			// In a real app, you would make an API call here
			toast.success('Preferences updated');
			return newState;
		});
	};

	const ToggleRow = ({
		label,
		checked,
		onChange,
	}: {
		label: string;
		checked: boolean;
		onChange: () => void;
	}) => (
		<div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-lg">
			<span className="text-sm font-medium text-foreground">{label}</span>
			<label className="relative inline-flex items-center cursor-pointer">
				<input
					type="checkbox"
					className="sr-only peer"
					checked={checked}
					onChange={onChange}
				/>
				<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
			</label>
		</div>
	);

	return (
		<>
			<NextSeo title="Settings | Joey Jazwinski" noindex={true} />
			<main className="min-h-screen bg-background pt-30 pb-16 px-4 sm:px-6 md:px-8">
				<div className="max-w-3xl mx-auto space-y-8">
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						className="mb-8"
					>
						<h1 className="text-3xl font-bold text-foreground">
							User Settings
						</h1>
						<p className="text-muted-foreground mt-2">
							Manage your account preferences and security.
						</p>
					</motion.div>

					{/* Notifications Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="bg-card border border-border rounded-xl shadow-sm overflow-hidden"
					>
						<div className="p-6 border-b border-border bg-muted/10">
							<div className="flex items-center gap-4">
								<div className="p-3 bg-orange-500/10 text-orange-600 rounded-xl">
									<Bell className="w-6 h-6" />
								</div>
								<div>
									<h3 className="text-lg font-semibold text-foreground">
										Notifications
									</h3>
									<p className="text-sm text-muted-foreground">
										Manage your email preferences.
									</p>
								</div>
							</div>
						</div>
						<div className="p-6 space-y-2">
							<ToggleRow
								label="Email me about new courses"
								checked={notifications.emailCourses}
								onChange={() =>
									handleNotificationChange('emailCourses')
								}
							/>
							<ToggleRow
								label="Weekly progress digest"
								checked={notifications.weeklyDigest}
								onChange={() =>
									handleNotificationChange('weeklyDigest')
								}
							/>
							<ToggleRow
								label="Security alerts"
								checked={notifications.securityAlerts}
								onChange={() =>
									handleNotificationChange('securityAlerts')
								}
							/>
						</div>
					</motion.div>

					{/* Security Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="bg-card border border-border rounded-xl shadow-sm overflow-hidden"
					>
						<div className="p-6 border-b border-border bg-muted/10">
							<div className="flex items-center gap-4">
								<div className="p-3 bg-purple-500/10 text-purple-600 rounded-xl">
									<Lock className="w-6 h-6" />
								</div>
								<div>
									<h3 className="text-lg font-semibold text-foreground">
										Security
									</h3>
									<p className="text-sm text-muted-foreground">
										Manage your account security.
									</p>
								</div>
							</div>
						</div>
						<div className="p-6">
							<div className="flex flex-wrap gap-4">
								<button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors font-medium text-sm text-foreground shadow-sm">
									<Key className="w-4 h-4 text-muted-foreground" />
									Change Password
								</button>
								<button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors font-medium text-sm text-foreground shadow-sm">
									<Smartphone className="w-4 h-4 text-muted-foreground" />
									Enable 2FA
								</button>
							</div>
						</div>
					</motion.div>
				</div>
			</main>
		</>
	);
};

export default SettingsPage;
