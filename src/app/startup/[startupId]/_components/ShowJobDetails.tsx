import { IJob } from "@/app/(home)/page"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MapPin, Users, DollarSign, Briefcase } from "lucide-react"
import ApplyNow from "./ApplyNow"
import { getServerSession } from 'next-auth';

export default async function ShowJobDetails({ jobData }: { jobData: IJob }) {

    const session = await getServerSession();

    const res = await fetch('http://localhost:3000/api/get-founders', {
        method: 'POST',
        body: JSON.stringify({email: jobData.email})
    });
    const {data} = await res.json();

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <Card className="w-full">
                <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl font-bold mb-2">{jobData.jobRole}</CardTitle>
                            <h2 className="text-xl text-muted-foreground">{jobData.companyName}</h2>
                        </div>
                        <Badge variant="secondary" className="text-sm px-3 py-1">
                            {jobData.primaryTag}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span>{jobData.companyLocation}</span>
                            </div>
                            <div className="flex items-center">
                                <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span>{jobData.numberOfPeople} employees</span>
                            </div>
                            <div className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span>${jobData.minSalary}k - ${jobData.maxSalary}k</span>
                            </div>
                            <div className="flex items-center">
                                <Briefcase className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span>{jobData.employmentType.replace('-', ' ')}</span>
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="text-lg font-semibold mb-2">About the Company</h3>
                            <p className="text-muted-foreground">{jobData.aboutCompany}</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Mission</h3>
                                <p className="text-muted-foreground">{jobData.companyMission}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Vision</h3>
                                <p className="text-muted-foreground">{jobData.companyVision}</p>
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                            <p className="text-muted-foreground">{jobData.jobDescription}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {jobData.tags.map((tag, index) => (
                                    <Badge key={index} variant="outline">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">About Founders</h3>
                            <p className="text-muted-foreground">{data.about}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-6 bg-gray-50">
                    {session?.user?.email ? <ApplyNow jobId={jobData._id} userEmail={session?.user?.email} companyEmail={jobData.email} /> :
                        <p className="font-bold text-xl">Login to Apply for Job</p>}
                </CardFooter>
            </Card>
        </div>
    )
}