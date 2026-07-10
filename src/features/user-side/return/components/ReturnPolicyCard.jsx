import { POLICIES } from "../constants/returnPolicies";

const ReturnPolicyCard = () => {
  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-5 text-lg font-semibold">Return Policy</h2>

      <div className="space-y-4">
        {POLICIES?.map((policy) => {
          const Icon = policy.icon;

          return (
            <div key={policy.text} className="flex items-start gap-3">
              <Icon size={18} className="text-primary mt-0.5" />

              <p className="text-muted-foreground text-sm">{policy.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReturnPolicyCard;
