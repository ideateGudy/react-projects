import type { ExtensionsData } from "@/data/data";
import Button from "./Button";
import { Switch } from "@/components/ui/switch";

const Card = ({ logo, name, description, isActive }: ExtensionsData) => {
  return (
    <div>
      <div className="bg-neutral-0 dark:bg-neutral-800 rounded-2xl px-4 py-3 shadow my-4 w-full">
        <div className="flex">
          <div className="">
            <img src={logo} alt={name} className="w-12 lg:w-20" />
          </div>
          <div className="flex flex-col justify-between ml-4">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {description}
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Button
            text="Remove"
            isActive={false}
            textColor="black"
            outline={true}
            onClick={() => {}}
          />

          <Switch
            defaultChecked={isActive}
            onCheckedChange={(checked) => console.log(checked)}
            className="h-6 w-11 data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-neutral-300 dark:data-[state=unchecked]:bg-neutral-600 cursor-pointer **:data-[slot=switch-thumb]:size-5 **:data-[slot=switch-thumb]:bg-white **:data-[slot=switch-thumb]:shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
