import { Button } from "@/shared/components/ui/button";

const EmptyPage = ({
  icon: Icon,
  title,
  description,
  buttonText,
  onButtonClick,
}) => {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-10 text-center">
        {Icon && (
          <div className="flex justify-center">
            <Icon className="text-muted-foreground h-16 w-16" />
          </div>
        )}

        <h2 className="mt-6 text-2xl font-bold">{title}</h2>

        <p className="text-muted-foreground mt-3">{description}</p>

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
