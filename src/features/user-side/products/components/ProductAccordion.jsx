import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";

const ProductAccordion = ({ product = {} }) => {
  const accordionItems = [
    {
      value: "description",
      title: "Product Description",
      content: product?.description,
    },

    {
      value: "fabric",
      title: "Fabric & Care",
      content: product?.fabric,
    },

    {
      value: "manufacturer",
      title: "Manufacturer Details",
      content: `
${product?.manufacturer?.name || ""}

${product?.manufacturer?.address || ""}

Phone: ${product?.manufacturer?.phone || ""}

Email: ${product?.manufacturer?.email || ""}
      `,
    },

    {
      value: "returns",
      title: "Returns Information",
      content: product?.isReturnable
        ? `Easy ${product?.returnWindowDays}-day return available for this product.`
        : "This product is not returnable.",
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full mt-10">
      {accordionItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger className="font-bold">{item.title}</AccordionTrigger>

          <AccordionContent>
            <div className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
              {item.content}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ProductAccordion;
