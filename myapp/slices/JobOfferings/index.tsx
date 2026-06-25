import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `JobOfferings`.
 */
export type JobOfferingsProps = SliceComponentProps<Content.JobOfferingsSlice>;

/**
 * Component for "JobOfferings" Slices.
 */
const JobOfferings = ({ slice }: JobOfferingsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for job_offerings (variation: {slice.variation})
      Slices
    </section>
  );
};

export default JobOfferings;
