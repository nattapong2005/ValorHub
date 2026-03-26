import { getAgents } from "@/lib/api";
import AgentsClient from "@/components/AgentsClient";

export default async function AgentsPage() {
  const agents = await getAgents();
  return <AgentsClient agents={agents} />;
}
