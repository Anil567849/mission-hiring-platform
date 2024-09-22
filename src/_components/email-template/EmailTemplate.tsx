import * as React from 'react';

interface EmailTemplateProps {
  desc: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  desc,
}) => (
  <div>
    <p>{desc}!</p>
  </div>
);