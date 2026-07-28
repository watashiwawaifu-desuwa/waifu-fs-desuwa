import { supabase } from "./supabase";

export async function getRecommendationCount(slug: string): Promise<number> {
  const { data, error } = await supabase
    .from("works")
    .select("recommendations")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("อ่านยอดแนะนำไม่สำเร็จ:", error);
    throw new Error("ไม่สามารถอ่านยอดแนะนำได้");
  }

  return Number(data?.recommendations ?? 0);
}

export async function addRecommendation(slug: string): Promise<number> {
  const { data, error } = await supabase.rpc("increment_recommendation", {
    work_slug: slug,
  });

  if (error) {
    console.error("เพิ่มยอดแนะนำไม่สำเร็จ:", error);
    throw new Error("ไม่สามารถเพิ่มยอดแนะนำได้");
  }

  return Number(data);
}