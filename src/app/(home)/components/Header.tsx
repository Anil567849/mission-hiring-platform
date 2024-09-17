import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Component() {
  return (
    <div className="relative h-[60vh] w-full bg-center flex flex-col items-center justify-center bg-[url('/bg1.jpg')] bg-cover">
      {/* Buttons at the top right */}
      <div className="absolute top-4 right-4 space-x-2">
        <Button variant="outline" className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-3xl">
          Login
        </Button>
        <Button className="bg-primary hover:bg-primary/90 rounded-3xl">
          Post a Job
        </Button>
      </div>
      
      {/* Centered content */}
      <div className="text-center space-y-6 max-w-2xl px-4">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          Welcome to Our Platform
        </h1>
        <p className="text-xl text-white drop-shadow-md">
          Discover amazing content and connect with others. Start your journey today!
        </p>
        <div className="flex w-full max-w-md mx-auto">
          <Input 
            type="search" 
            placeholder="Search..." 
            className="flex-grow text-white font-bold rounded-3xl"
          />
          <Button type="submit" className="ml-2">
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}