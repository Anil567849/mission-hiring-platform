import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign } from 'lucide-react';

interface IJob {
    logo: string,
    title: string,
    company: string,
    benefits: any[],
    tags: any[],
    posted: string,
}

const JobListingCard = ({logo, title, company, benefits, tags, posted}: IJob) => {

  return (
    <Card className="grid grid-rows-subgrid grid-rows-2 w-full h-[100%] max-w-md mx-auto overflow-hidden shadow-xl rounded-3xl">
      <CardHeader className="flex items-center justify-between p-6 bg-gray-50">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Company Logo" className="w-12 h-12 rounded-full" />
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-gray-600">{company}</p>
          </div>
        </div>
        <Badge variant="secondary">{posted}</Badge>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              {index === 0 && <MapPin className="w-4 h-4 mr-1" />}
              {index === 1 && <DollarSign className="w-4 h-4 mr-1" />}
              {index === 2 && <Clock className="w-4 h-4 mr-1" />}
              {benefit}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 bg-gray-50">
        <button className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
          Apply Now
        </button>
      </CardFooter>
    </Card>
  );
};

export default JobListingCard;