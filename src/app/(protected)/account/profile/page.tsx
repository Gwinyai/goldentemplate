import { requireUser } from "@/lib/auth/require-user";
import { ProfileForm } from "@/components/forms/profile-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function ProfilePage() {
  const user = await requireUser();

  const handleProfileUpdate = async (data: any) => {
    "use server";
    
    // TODO: Integrate with auth provider to update user profile
    // This will be implemented based on the chosen auth provider (Supabase/Firebase)
    console.log("Updating profile with data:", data);
    
    // For now, just simulate the update
    // In a real implementation, this would:
    // 1. Update the user metadata in the auth provider
    // 2. Update any additional user data in the database
    // 3. Handle errors and return appropriate responses
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your personal information and profile preferences.
          </p>
        </div>

        <ProfileForm user={user} onSave={handleProfileUpdate} />

        {/* Preferences */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Profile Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Public Profile</div>
                  <div className="text-sm text-muted-foreground">
                    Make your profile visible to other users
                  </div>
                </div>
                <div className="text-sm font-medium text-green-600">Enabled</div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Contact Information</div>
                  <div className="text-sm text-muted-foreground">
                    Allow others to see your contact details
                  </div>
                </div>
                <div className="text-sm font-medium text-orange-600">Private</div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Activity Status</div>
                  <div className="text-sm text-muted-foreground">
                    Show when you're active on the platform
                  </div>
                </div>
                <div className="text-sm font-medium text-green-600">Enabled</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Privacy preference management will be enhanced in future updates.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}