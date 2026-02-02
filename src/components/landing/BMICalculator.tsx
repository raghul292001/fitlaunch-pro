import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calculator, Info } from "lucide-react";
import { z } from "zod";

const bmiSchema = z.object({
  height: z.number().min(50, "Height must be at least 50 cm").max(300, "Height must be less than 300 cm"),
  weight: z.number().min(20, "Weight must be at least 20 kg").max(500, "Weight must be less than 500 kg"),
});

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [error, setError] = useState("");

  const calculateBMI = () => {
    setError("");
    setBmi(null);

    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    const result = bmiSchema.safeParse({ height: heightNum, weight: weightNum });
    
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    const heightInMeters = heightNum / 100;
    const calculatedBMI = weightNum / (heightInMeters * heightInMeters);
    setBmi(Math.round(calculatedBMI * 10) / 10);
  };

  const getBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return { label: "Underweight", color: "text-blue-400" };
    if (bmiValue < 25) return { label: "Normal", color: "text-primary" };
    if (bmiValue < 30) return { label: "Overweight", color: "text-yellow-400" };
    return { label: "Obese", color: "text-red-400" };
  };

  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          <div className="text-center mb-10">
            <span className="text-primary font-semibold uppercase tracking-widest text-sm">
              Health Tool
            </span>
            <h2 className="text-4xl md:text-5xl font-display mt-4 mb-4">
              BMI <span className="text-gradient">Calculator</span>
            </h2>
            <p className="text-muted-foreground">
              Calculate your Body Mass Index to understand your weight category.
            </p>
          </div>

          <div className="p-8 rounded-2xl card-gradient border border-border/50">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value.slice(0, 5))}
                  placeholder="170"
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:border-primary transition-colors"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value.slice(0, 5))}
                  placeholder="70"
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:border-primary transition-colors"
                  maxLength={5}
                />
              </div>
            </div>

            {error && (
              <p className="text-destructive text-sm mb-4">{error}</p>
            )}

            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={calculateBMI}
            >
              <Calculator className="w-5 h-5" />
              Calculate BMI
            </Button>

            {bmi !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-6 rounded-xl bg-primary/10 border border-primary/20 text-center"
              >
                <p className="text-sm text-muted-foreground mb-2">Your BMI</p>
                <p className="text-5xl font-display mb-2">{bmi}</p>
                <p className={`text-lg font-semibold ${getBMICategory(bmi).color}`}>
                  {getBMICategory(bmi).label}
                </p>
              </motion.div>
            )}

            <div className="mt-6 flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                BMI is a general indicator and doesn't account for muscle mass, bone density, or body composition. Consult a professional for personalized advice.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BMICalculator;
