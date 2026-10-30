import type { Metadata } from "next";
import { EstimateConfigurator } from "@/components/estimate/EstimateConfigurator";

export const metadata: Metadata = {
  title: "Get a same-hour estimate",
};

export default function EstimatePage() {
  return <EstimateConfigurator />;
}
