import { POLICIES } from "../constants/returnPolicies";

const ReturnPolicyCard = () => {
  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="font-semibold text-lg mb-5">Return Policy</h2>

      <div className="space-y-4">
        {POLICIES?.map((policy) => {
          const Icon = policy.icon;

          return (
            <div key={policy.text} className="flex items-start gap-3">
              <Icon size={18} className="text-primary mt-0.5" />

              <p className="text-sm text-muted-foreground">{policy.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReturnPolicyCard;
