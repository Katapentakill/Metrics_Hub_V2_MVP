# Mock Authentication System

This is a comprehensive front-end only authentication system for testing all roles and permissions without any backend dependencies.

## 🚀 Quick Start

1. **Login with any of these personas:**
   - **Admin:** alex@metrics.com (admin123)
   - **HR:** sarah@metrics.com (hr123) 
   - **Senior HR:** mike@metrics.com (seniorhr123)
   - **Project Manager:** lisa@metrics.com (pm123)
   - **Volunteer:** tom@metrics.com (volunteer123)
   - **Unassigned:** guest@metrics.com (guest123)

2. **Access Demo Controls:** Click the red settings button in the bottom-right corner (admin only)

3. **Test Authentication:** Visit `/auth-test` to see all authentication data and test permissions

## 🔐 Features

### Authentication Flows
- ✅ Sign up, sign in, sign out
- ✅ Email verification (toggle in demo controls)
- ✅ Two-factor authentication (fake 6-digit codes)
- ✅ Single sign-on simulation (Google/Microsoft)
- ✅ Password reset with new demo password generation

### Role-Based Access Control
- ✅ **Admin:** Full access to everything
- ✅ **HR:** User management, regional settings, templates
- ✅ **Senior HR:** Same as HR + audit log access
- ✅ **Project Manager:** Project templates, personal settings
- ✅ **Volunteer:** Personal settings only
- ✅ **Unassigned:** No access, pending role assignment

### Security Features
- ✅ Audit logging for all actions
- ✅ Security alerts for suspicious activity
- ✅ Permission checking for all routes and actions
- ✅ Session management with expiration
- ✅ Fake IP and user agent tracking

### Demo Controls
- ✅ Switch between personas instantly
- ✅ Toggle email verification, 2FA, SSO
- ✅ Export/import authentication data
- ✅ Reset to seed data or clear everything
- ✅ Simulate network delays and loading states

## 📁 File Structure

```
src/lib/auth/
├── authData.ts          # Seed users, roles, permissions
├── authStore.ts         # In-memory store with localStorage
├── authActions.ts       # Authentication actions
└── routeProtection.ts   # Route and permission checking

src/components/
├── AuthTestPanel.tsx    # Main authentication test panel
└── AuthTestButton.tsx   # Floating test button

src/modules/auth/
├── LoginForm.tsx        # Updated with 2FA support
├── RegisterForm.tsx     # Updated with mock registration
└── ForgotPasswordForm.tsx # Updated with mock reset

src/app/
├── admin/               # Admin dashboard and management
├── hr/                  # HR dashboard and recruitment
├── project-manager/     # Project manager portal
├── volunteer-portal/    # Volunteer portal
└── auth-test/           # Authentication testing page
```

## 🧪 Testing

### Manual Test Cases

**Happy Path Tests:**
1. Login as Alex (admin) → Access all pages → Change global settings → Success
2. Login as Sarah (HR) → Invite user → Set role → Success  
3. Login as Lisa (PM) → View projects → Edit project templates → Success
4. Login as Tom (volunteer) → Edit personal settings → Success

**Failure Path Tests:**
1. Login as Tom → Try to change own role → Deny + audit
2. Login as Lisa → Try to reset Alex's password → Deny + audit
3. Login as Tom → Try to view audit logs → Deny + redirect
4. Login as Sarah → Try to change global settings → Deny + redirect
5. Login as Lisa → Try to disable required 2FA → Deny + audit

### Permission Matrix

| Action | Admin | HR | Senior HR | PM | Volunteer | Unassigned |
|--------|-------|----|-----------|----|-----------|-----------| 
| Invite user | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Reset password for others | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Set role for others | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Enforce 2FA for others | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| View auth audit logs | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Export auth audit logs | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Configure SSO | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Rotate integration tokens | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Manage sessions for others | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Change global settings | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Change regional settings | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Edit regional templates | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Edit project templates | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| Edit personal settings | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |

## 🔧 Configuration

### Local Storage Keys
- `metrics_hub_session` - Current user session
- `metrics_hub_users` - All users data
- `metrics_hub_audit_log` - Audit trail
- `metrics_hub_alerts` - Security alerts
- `metrics_hub_demo_controls` - Demo settings

### Route Protection
Protected routes are defined in `mockData.ts` under `ROUTE_PROTECTION`:
- `/admin/*` - Admin only
- `/hr/*` - Admin and HR
- `/lead/*` - Admin, HR, and Lead Project
- `/volunteer/*` - All authenticated users

## ⚠️ Important Notes

1. **DEMO ONLY:** This system is for testing only. Never use in production.

2. **No Real Security:** All passwords are fake, 2FA codes are accepted, and sessions are stored in localStorage.

3. **Data Persistence:** Data persists in localStorage but is reset on page refresh if not saved.

4. **Export/Import:** Use the demo controls to export your test data and import it later.

5. **Reset Options:** 
   - "Reset to Seed" - Restores original personas
   - "Clear All Data" - Removes everything and redirects to login

## 🚨 Security Alerts

The system simulates these security alerts:
- **Repeated Failed Login:** 3+ failed attempts in 5 minutes
- **Impossible Travel:** Login from different "locations" < 1 hour
- **Many Password Resets:** 3+ resets in 24 hours  
- **Privilege Escalation:** Unauthorized role change attempts

## 🔄 Migration to Real Backend

When ready to implement real authentication:

1. Replace mock actions with real API calls
2. Implement secure session management (HTTP-only cookies)
3. Add real password hashing and validation
4. Implement actual 2FA with TOTP
5. Add real email verification
6. Implement proper audit logging to database
7. Add rate limiting and security measures
8. Remove all demo controls and test data

## 📞 Support

For questions about the authentication system, check:
- `/auth-test` - Live authentication data
- Auth test panel - Interactive testing
- This README - Complete documentation
