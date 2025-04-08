import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, School } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegisterInstructorMutation } from "@/features/api/instructorApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const InstructorSignup = () => {
  const navigate = useNavigate();
  const [instructorInput, setInstructorInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    qualification: "",
    experience: "",
    specialization: "",
    bio: "",
    profileUrl: "",
    skills: [],
    currentSkill: "",
  });

  const [registerInstructor, { isLoading, isSuccess, error, data }] = useRegisterInstructorMutation();

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setInstructorInput({ ...instructorInput, [name]: value });
  };

  const handleSelectChange = (value) => {
    setInstructorInput({ ...instructorInput, experience: value });
  };

  const addSkill = () => {
    if (instructorInput.currentSkill.trim() !== "" && !instructorInput.skills.includes(instructorInput.currentSkill.trim())) {
      setInstructorInput({
        ...instructorInput,
        skills: [...instructorInput.skills, instructorInput.currentSkill.trim()],
        currentSkill: "",
      });
    }
  };

  const removeSkill = (skillToRemove) => {
    setInstructorInput({
      ...instructorInput,
      skills: instructorInput.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create payload without the currentSkill temp field
    const { currentSkill, ...payload } = instructorInput;
    
    try {
      await registerInstructor(payload);
      if (isSuccess) {
        toast.success(data?.message || "Application submitted successfully!");
        navigate("/instructor-pending");
      }
    } catch (err) {
      toast.error(error?.data?.message || "Submission failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full justify-center mt-20 px-4 pb-10">
      <div className="flex items-center gap-2 mb-6">
        <School size={30} />
        <h1 className="font-extrabold text-2xl">Academia Instructor Application</h1>
      </div>
      
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Apply to Become an Instructor</CardTitle>
          <CardDescription>
            Share your expertise with our community. Fill out this form to apply for an instructor position.
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={instructorInput.name}
                  onChange={changeInputHandler}
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={instructorInput.email}
                  onChange={changeInputHandler}
                  placeholder="johndoe@example.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={instructorInput.password}
                  onChange={changeInputHandler}
                  placeholder="Create a strong password"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={instructorInput.phone}
                  onChange={changeInputHandler}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="qualification">Highest Qualification *</Label>
                <Input
                  id="qualification"
                  name="qualification"
                  value={instructorInput.qualification}
                  onChange={changeInputHandler}
                  placeholder="PhD in Computer Science"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Teaching Experience *</Label>
                <Select 
                  value={instructorInput.experience}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialization">Primary Specialization *</Label>
                <Input
                  id="specialization"
                  name="specialization"
                  value={instructorInput.specialization}
                  onChange={changeInputHandler}
                  placeholder="Web Development"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="profileUrl">Profile Picture URL</Label>
                <Input
                  id="profileUrl"
                  name="profileUrl"
                  value={instructorInput.profileUrl}
                  onChange={changeInputHandler}
                  placeholder="https://example.com/your-photo.jpg"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Skills & Technologies *</Label>
              <div className="flex gap-2">
                <Input
                  name="currentSkill"
                  value={instructorInput.currentSkill}
                  onChange={changeInputHandler}
                  placeholder="Add a skill (e.g., JavaScript, React)"
                />
                <Button type="button" onClick={addSkill} variant="outline">
                  Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {instructorInput.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-xs hover:text-destructive"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              {instructorInput.skills.length === 0 && (
                <p className="text-xs text-muted-foreground">Please add at least one skill</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio *</Label>
              <Textarea
                id="bio"
                name="bio"
                value={instructorInput.bio}
                onChange={changeInputHandler}
                placeholder="Tell us about your teaching philosophy, professional experience, and why you'd be a great instructor for our platform."
                className="min-h-[150px]"
                required
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-4">
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isLoading || instructorInput.skills.length === 0}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => navigate("/login")}
            >
              Already have an account? Login
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Looking to join as a student? <Link to="/login?tab=signup" className="text-primary hover:underline">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default InstructorSignup;