import { motion } from "framer-motion";
import { MapPin, Link as LinkIcon, Calendar } from "lucide-react";
import { Card } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import type { ProfileHeaderProps } from "./profileHeader.types";
import { getAvatarAlt } from "./profileHeader.utils";
import type { User } from "../../profile.types";

// Extend props to include edit handlers
interface ExtendedProfileHeaderProps extends ProfileHeaderProps {
  isEditing: boolean;
  editForm: User | null;
  onStartEditing: () => void;
  onCancelEditing: () => void;
  onSaveEditing: () => void;
  onUpdateForm: (field: keyof User, value: string) => void;
}

export function ProfileHeader({
  user,
  isEditing,
  editForm,
  onStartEditing,
  onCancelEditing,
  onSaveEditing,
  onUpdateForm,
}: ExtendedProfileHeaderProps) {
  // Fallback to prevent null access errors
  const safeEditForm = editForm || user;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-8 border-2 shadow-xl transition-all duration-300 mb-8 relative overflow-hidden bg-card border-primary">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-primary via-secondary to-accent opacity-10" />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-sm opacity-75"></div>
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={getAvatarAlt(user.name)}
                  className="w-32 h-32 rounded-full object-cover border-4 bg-background"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <>
                  <Input
                    value={safeEditForm.name}
                    onChange={(e) => onUpdateForm("name", e.target.value)}
                    className="mb-1 text-primary"
                    placeholder="Name"
                  />
                  <Input
                    value={safeEditForm.username}
                    onChange={(e) => onUpdateForm("username", e.target.value)}
                    className="text-lg mb-3 opacity-70 text-muted-foreground"
                    placeholder="Username"
                    disabled
                  />
                  <Textarea
                    value={safeEditForm.bio}
                    onChange={(e) => onUpdateForm("bio", e.target.value)}
                    className="mb-4 max-w-2xl text-muted-foreground"
                    placeholder="Bio"
                  />
                </>
              ) : (
                <>
                  <h2 className="mb-1 text-primary">{user.name}</h2>
                  <p className="text-lg mb-3 opacity-70 text-muted-foreground">{user.username}</p>
                  <p className="mb-4 max-w-2xl text-muted-foreground">{user.bio}</p>
                </>
              )}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm mb-4">
                {isEditing ? (
                  <>
                    <div className="flex items-center gap-2 opacity-70">
                      <MapPin className="w-4 h-4 text-primary" />
                      <Input
                        value={safeEditForm.location}
                        onChange={(e) => onUpdateForm("location", e.target.value)}
                        className="text-muted-foreground"
                        placeholder="Location"
                      />
                    </div>
                    <div className="flex items-center gap-2 opacity-70">
                      <LinkIcon className="w-4 h-4 text-primary" />
                      <Input
                        value={safeEditForm.website}
                        onChange={(e) => onUpdateForm("website", e.target.value)}
                        className="text-primary"
                        placeholder="Website"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 opacity-70">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{user.location}</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-70">
                      <LinkIcon className="w-4 h-4 text-primary" />
                      <a href={`https://${user.website}`} className="hover:underline transition-colors duration-300 text-primary">
                        {user.website}
                      </a>
                    </div>
                  </>
                )}
                <div className="flex items-center gap-2 opacity-70">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{user.joinDate}</span>
                </div>
              </div>
              {isEditing ? (
                <div className="flex gap-2">
                  <Button
                    onClick={onSaveEditing}
                    className="transition-all duration-300 hover:scale-105 shadow-lg bg-primary text-primary-foreground"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={onCancelEditing}
                    variant="outline"
                    className="transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={onStartEditing}
                  className="transition-all duration-300 hover:scale-105 shadow-lg bg-primary text-primary-foreground"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-border">
            <motion.div
              className="text-center p-4 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer bg-muted"
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-1 text-2xl font-bold bg-gradient-to-r from-[#671425] via-[#8B1D35] to-[#A82444] bg-clip-text text-transparent">
                {user.stats.outfits}
              </div>
              <div className="text-sm opacity-70 text-muted-foreground">Outfits</div>
            </motion.div>
            <motion.div
              className="text-center p-4 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer bg-muted"
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-1 text-2xl font-bold bg-gradient-to-r from-[#671425] via-[#8B1D35] to-[#A82444] bg-clip-text text-transparent">
                {user.stats.followers.toLocaleString()}
              </div>
              <div className="text-sm opacity-70 text-muted-foreground">Followers</div>
            </motion.div>
            <motion.div
              className="text-center p-4 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer bg-muted"
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-1 text-2xl font-bold bg-gradient-to-r from-[#671425] via-[#8B1D35] to-[#A82444] bg-clip-text text-transparent">
                {user.stats.following}
              </div>
              <div className="text-sm opacity-70 text-muted-foreground">Following</div>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}