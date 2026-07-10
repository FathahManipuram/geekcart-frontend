const SupportCard = ({ orderNumber }) => {
  const email = "support@geekcart.com";
  const subject = encodeURIComponent(
    `Delivery Issue - Order #${orderNumber || "UNKNOWN"}`,
  );
  const body = encodeURIComponent(
    "Hi Support Team,\n\nI am experiencing an issue with my delivery. Here are my details...\n\n",
  );

  return (
    <div className="bg-primary rounded-2xl p-8 text-white">
      <h3 className="text-2xl font-semibold">Need Assistance?</h3>

      <p className="mt-3 text-sm opacity-90">
        Our support team is available to help with any delivery issues.
      </p>

      <a
        href={`mailto:${email}?subject=${subject}&body=${body}`}
        className="text mt-4 inline-block font-semibold hover:underline"
      >
        Contact Support →
      </a>
    </div>
  );
};

export default SupportCard;
