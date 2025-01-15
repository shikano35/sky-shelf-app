export function isAdmin(user) {
  const adminEmails = ["admin@admin.com"];
  const adminIds = [1];

  return adminEmails.includes(user.email) || adminIds.includes(user.id);
}
