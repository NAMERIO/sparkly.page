"use client";

import { useState } from "react";

export type UserRole = {
	id: string;
	name: string;
	color: string;
	icon?: string;
};

export function Roles({ roles }: { roles: UserRole[] }) {
	const [showAllRoles, setShowAllRoles] = useState(false);
	const getMaxWidth = ({ icon }: UserRole) => (icon ? "268px" : "236.125px");
	const visibleRoles = [...roles].slice(0, 3);
	const hiddenRolesCount = roles.length - visibleRoles.length;

	if (!roles) return;

	return (
		<section className="section_bf424d">
		<div className="headings_bf424d">
			<div className="header_bf424d">
				<h1
					className="text-xs/semibold_cf4812 defaultColor__5345c"
					data-text-variant="text-xs/semibold"
					style={{
						color: "var(--header-secondary)",
					}}
				>
					Roles
				</h1>
			</div>
		</div>
		<div
			aria-label="Roles"
			className="root_fccfdf"
			data-list-id="roles-831667b0-43f5-4c51-a347-0648ff895d13"
		>
			{(showAllRoles ? roles : visibleRoles).map((role) => (
				<div
					key={role.id}
					aria-label={role.name}
					className="role_dfa8b6 pill_dfa8b6"
					data-list-item-id={`roles-831667b0-43f5-4c51-a347-0648ff895d13___${role.id}`}
					style={{ maxWidth: getMaxWidth(role) }}
				>
					<div
						aria-hidden="true"
						aria-label={`Remove role ${role.name}`}
						className="roleRemoveButton_dfa8b6"
					>
						<span
							className="roleCircle__4f569 desaturateUserColors__41f68 roleCircle_dfa8b6"
							style={{ backgroundColor: role.color }}
						/>
					</div>

					{role.icon && (
						<span>
							<img
								alt=""
								aria-label={`Role icon, ${role.name}`}
								className="roleIcon__1e6f1 roleIcon_dfa8b6"
								height="16"
								src={role.icon}
								width="16"
							/>
						</span>
					)}

					<span style={{ display: "none" }} />

					<div aria-hidden="true" className="roleName_dfa8b6">
						<div
							className="defaultColor__4bd52 text-xs/medium_cf4812"
							data-text-variant="text-xs/medium"
						>
							<div className="overflow__82b15">{role.name}</div>
							<span style={{ display: "none" }} />
						</div>
					</div>
				</div>
			))}

			{!showAllRoles && hiddenRolesCount > 0 && (
				<div aria-label="View All Roles" onClick={() => setShowAllRoles(true)}>
					<button className="expandButton_fccfdf pill_fccfdf">
						<div
							className="defaultColor__4bd52 text-xs/medium_cf4812"
							data-text-variant="text-xs/medium"
						>
							+{hiddenRolesCount}
						</div>
					</button>
				</div>
			)}

			<span style={{ display: "none" }} />
		</div>
	</section>

	);
}
