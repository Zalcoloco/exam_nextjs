import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";

/**
 * Props for `LegalTerms`.
 */
export type LegalTermsProps = SliceComponentProps<Content.LegalTermsSlice>;

/**
 * Component for "LegalTerms" Slices.
 */
const LegalTerms: FC<LegalTermsProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.heading} />
      {slice.primary.sections.map((section, index) => (
        <div key={index}>
          <PrismicRichText field={section.section_title} />
          <PrismicRichText field={section.section_content} />
        </div>
      ))}
    </section>
  );
};

export default LegalTerms;
