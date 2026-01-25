import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, User, ArrowRight, UserPlus, LogIn, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email("Adresse email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

const signupSchema = z.object({
  firstName: z.string().trim().min(1, "Le prénom est requis").max(50, "Le prénom est trop long"),
  lastName: z.string().trim().min(1, "Le nom est requis").max(50, "Le nom est trop long"),
  email: z.string().trim().email("Adresse email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Adresse email invalide"),
});

type AuthMode = "login" | "signup" | "forgot-password";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resetEmailSent, setResetEmailSent] = useState(false);
  
  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Signup form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Forgot password form
  const [forgotEmail, setForgotEmail] = useState("");
  
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/app/dashboard";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const result = loginSchema.safeParse({ email: loginEmail, password: loginPassword });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await signIn(loginEmail, loginPassword);
    setLoading(false);

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: error.message,
        });
      }
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const result = signupSchema.safeParse({
      firstName,
      lastName,
      email: signupEmail,
      password: signupPassword,
      confirmPassword,
    });
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await signUp(signupEmail, signupPassword, {
      first_name: firstName,
      last_name: lastName,
    });
    setLoading(false);

    if (error) {
      if (error.message.includes("User already registered")) {
        toast({
          variant: "destructive",
          title: "Compte existant",
          description: "Un compte existe déjà avec cet email. Connectez-vous.",
        });
        setMode("login");
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: error.message,
        });
      }
    } else {
      toast({
        title: "Compte créé",
        description: "Votre compte a été créé avec succès.",
      });
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const result = forgotPasswordSchema.safeParse({ email: forgotEmail });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: `${window.location.origin}/auth`,
    });
    setLoading(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message,
      });
    } else {
      setResetEmailSent(true);
      toast({
        title: "Email envoyé",
        description: "Vérifiez votre boîte mail pour réinitialiser votre mot de passe.",
      });
    }
  };

  const renderForgotPasswordForm = () => {
    if (resetEmailSent) {
      return (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Email envoyé !</h2>
          <p className="text-muted-foreground">
            Si un compte existe avec l'adresse <strong>{forgotEmail}</strong>, vous recevrez un lien de réinitialisation.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setMode("login");
              setResetEmailSent(false);
              setForgotEmail("");
            }}
            className="mt-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la connexion
          </Button>
        </div>
      );
    }

    return (
      <>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Mot de passe oublié</h1>
          <p className="text-muted-foreground">
            Entrez votre email pour recevoir un lien de réinitialisation
          </p>
        </div>

        <form onSubmit={handleForgotPassword} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="votre@email.ma"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className={`h-12 text-base pl-12 ${errors.email ? "border-destructive" : ""}`}
              />
            </div>
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-xl font-bold"
          >
            {loading ? "Envoi..." : "Envoyer le lien"}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </form>

        <button
          onClick={() => setMode("login")}
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-6 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à la connexion
        </button>
      </>
    );
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-24 px-6">
        <div className="container mx-auto max-w-md">
          <div className="bg-card rounded-3xl p-10 border-2 border-border shadow-xl">
            {mode === "forgot-password" ? (
              renderForgotPasswordForm()
            ) : (
              <>
                {/* Toggle */}
                <div className="flex bg-muted rounded-xl p-1 mb-8">
                  <button
                    onClick={() => setMode("login")}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                      mode === "login" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                    }`}
                  >
                    <LogIn className="w-4 h-4" />
                    Connexion
                  </button>
                  <button
                    onClick={() => setMode("signup")}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                      mode === "signup" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                    }`}
                  >
                    <UserPlus className="w-4 h-4" />
                    Inscription
                  </button>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Lock className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h1 className="text-3xl font-bold mb-3">
                    {mode === "login" ? "Connexion" : "Créer un compte"}
                  </h1>
                  <p className="text-muted-foreground">
                    {mode === "login" 
                      ? "Accédez à votre espace FleetPay" 
                      : "Rejoignez FleetPay et optimisez votre flotte"}
                  </p>
                </div>

                {/* Login Form */}
                {mode === "login" ? (
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="votre@email.ma"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className={`h-12 text-base pl-12 ${errors.email ? "border-destructive" : ""}`}
                        />
                      </div>
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-foreground">Mot de passe</label>
                        <button
                          type="button"
                          onClick={() => setMode("forgot-password")}
                          className="text-sm text-primary hover:underline"
                        >
                          Mot de passe oublié ?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className={`h-12 text-base pl-12 ${errors.password ? "border-destructive" : ""}`}
                        />
                      </div>
                      {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-xl font-bold"
                    >
                      {loading ? "Connexion..." : "Se connecter"}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                ) : (
                  /* Signup Form */
                  <form onSubmit={handleSignup} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">Prénom</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="Jean"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={`h-12 text-base pl-12 ${errors.firstName ? "border-destructive" : ""}`}
                          />
                        </div>
                        {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">Nom</label>
                        <Input
                          type="text"
                          placeholder="Dupont"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className={`h-12 text-base ${errors.lastName ? "border-destructive" : ""}`}
                        />
                        {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="votre@email.ma"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          className={`h-12 text-base pl-12 ${errors.email ? "border-destructive" : ""}`}
                        />
                      </div>
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Mot de passe</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          className={`h-12 text-base pl-12 ${errors.password ? "border-destructive" : ""}`}
                        />
                      </div>
                      {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Confirmer le mot de passe</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`h-12 text-base pl-12 ${errors.confirmPassword ? "border-destructive" : ""}`}
                        />
                      </div>
                      {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-xl font-bold"
                    >
                      {loading ? "Création..." : "Créer mon compte"}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                )}
              </>
            )}

            <p className="text-center text-sm text-muted-foreground mt-8">
              <Link to="/" className="text-primary hover:underline">
                Retour à l'accueil
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;