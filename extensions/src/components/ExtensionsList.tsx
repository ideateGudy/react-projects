import { useState } from "react"
import Button from "./Button"
import Card from "./Card";
import { data } from "@/data/data";

const ExtensionsList = () => {
    const [isActive, setIsActive] = useState('all');

    const handleFilterChange = (filter: string) => {
        setIsActive((prev) => prev === filter ? 'all' : filter);
    }

    const filteredData = data.filter((extension) => {
        if (isActive === 'all') return true;
        return isActive === 'active' ? extension.isActive : !extension.isActive;
    });
  return (
    <div className="mt-12 mb-8">
        <div className="flex flex-col items-center sm:justify-between  sm:flex-row my-3 w-full">
            <h2 className="text-3xl font-bold mb-4 sm:mb-0">Extensions List</h2>
            <div className="mr-4 space-x-2 last:mr-0">
                <Button text="All" isActive={isActive === 'all'} onClick={() => handleFilterChange('all')} />
                <Button text="Active" isActive={isActive === 'active'} onClick={() => handleFilterChange('active')} />
                <Button text="Inactive" isActive={isActive === 'inactive'} onClick={() => handleFilterChange('inactive')} />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((extension) => (
                <Card key={extension.name} {...extension} />
            ))}
        </div>
    </div>
  )
}

export default ExtensionsList