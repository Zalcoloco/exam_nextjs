import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { asDate } from "@prismicio/client";

/**
 * Props for `JobPosting`.
 */
export type JobPostingProps = SliceComponentProps<Content.JobPostingSlice>;

/**
 * Component for "JobPosting" Slices.
 */
const JobPosting: FC<JobPostingProps> = ({ slice }) => {
  const date = asDate(slice.primary.date);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.title} />

      {date && <span>{date.toLocaleDateString()}</span>}

      <ul>
        {slice.primary.technologies.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>

      <PrismicRichText field={slice.primary.description} />

      <PrismicRichText field={slice.primary.applicationText} />

      <button>{slice.primary.submitButtonText}</button>
    </section>
  );
};

export default JobPosting;
