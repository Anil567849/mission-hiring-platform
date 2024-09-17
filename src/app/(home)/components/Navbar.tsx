import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { SearchIcon, MapPinIcon, DollarSignIcon, HeartIcon } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="bg-background shadow-md rounded-xl mt-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center font-bold text-xl">
                <SearchIcon className="mr-2 h-4 w-4" />
                Search
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-4 w-80">
                  <Label htmlFor="search">Job Title or Keywords</Label>
                  <Input id="search" placeholder="e.g. Software Engineer" className="mt-1" />
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center font-bold text-xl">
                <MapPinIcon className="mr-2 h-4 w-4" />
                Location
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-4 w-80">
                  <Label htmlFor="location">City or Zip Code</Label>
                  <Input id="location" placeholder="e.g. New York, NY" className="mt-1" />
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center font-bold text-xl">
                <DollarSignIcon className="mr-2 h-4 w-4" />
                Salary
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-4 w-80">
                  <Label>Salary Range</Label>
                  <Slider
                    defaultValue={[50000, 150000]}
                    max={200000}
                    step={1000}
                    className="mt-6"
                  />
                  <div className="flex justify-between mt-2 font-bold text-xl">
                    <span>$50,000</span>
                    <span>$150,000+</span>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center font-bold text-xl">
                <HeartIcon className="mr-2 h-4 w-4" />
                Benefits
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-4 w-80">
                  <Label>Select Benefits</Label>
                  <div className="mt-2 space-y-2">
                    {["Health Insurance", "401(k)", "Remote Work", "Paid Time Off"].map((benefit) => (
                      <div key={benefit} className="flex items-center">
                        <Checkbox id={benefit.toLowerCase().replace(/\s/g, '-')} />
                        <label
                          htmlFor={benefit.toLowerCase().replace(/\s/g, '-')}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {benefit}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}