import { Button } from "@/shared/components/ui/button";

const EmptyPage = ({
  icon: Icon,
  title,
  description,
  buttonText,
  onButtonClick,
}) => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white border rounded-2xl p-10">
        {Icon && (
          <div className="flex justify-center">
            <Icon className="h-16 w-16 text-muted-foreground" />
          </div>
        )}

        <h2 className="mt-6 text-2xl font-bold">{title}</h2>

        <p className="mt-3 text-muted-foreground">{description}</p>

        {buttonText && (
          <Button className="mt-6 w-full" onClick={onButtonClick}>
            {buttonText}
          </Button>
        )}
      </div>
    </section>
  );
};

export default EmptyPage;
