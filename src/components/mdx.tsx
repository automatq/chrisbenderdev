import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";
import { slugify as transliterate } from "transliteration";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import {
  Heading,
  HeadingLink,
  Text,
  InlineCode,
  TextProps,
  MediaProps,
  Accordion,
  AccordionGroup,
  Table,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
  List,
  ListItem,
  Line,
} from "@once-ui-system/core";
import { CodeBlock } from "@once-ui-system/core/code";

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <SmartLink href={href} {...props}>
        {children}
      </SmartLink>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function createImage({ alt, src, ...props }: MediaProps & { src: string }) {
  if (!src) {
    console.error("Media requires a valid 'src' property.");
    return null;
  }

  return (
    <Media
      marginTop="8"
      marginBottom="16"
      enlarge
      radius="m"
      border="neutral-alpha-medium"
      sizes="(max-width: 960px) 100vw, 960px"
      alt={alt}
      src={src}
      {...props}
    />
  );
}

function slugify(str: string): string {
  const strWithAnd = str.replace(/&/g, " and "); // Replace & with 'and'
  return transliterate(strWithAnd, {
    lowercase: true,
    separator: "-", // Replace spaces with -
  }).replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const CustomHeading = ({
    children,
    ...props
  }: Omit<React.ComponentProps<typeof HeadingLink>, "as" | "id">) => {
    const slug = slugify(children as string);
    return (
      <HeadingLink marginTop="24" marginBottom="12" as={as} id={slug} {...props}>
        {children}
      </HeadingLink>
    );
  };

  CustomHeading.displayName = `${as}`;

  return CustomHeading;
}

function createParagraph({ children }: TextProps) {
  return (
    <Text
      style={{ lineHeight: "175%" }}
      variant="body-default-m"
      onBackground="neutral-medium"
      marginTop="8"
      marginBottom="12"
    >
      {children}
    </Text>
  );
}

function createInlineCode({ children }: { children: ReactNode }) {
  return <InlineCode>{children}</InlineCode>;
}

function createCodeBlock(props: React.ComponentProps<"pre">) {
  // For pre tags that contain code blocks
  const child = React.isValidElement<{ className?: string; children?: string }>(props.children)
    ? props.children
    : undefined;
  if (child?.props.className) {
    const { className, children } = child.props;

    // Extract language from className (format: language-xxx)
    const language = className.replace("language-", "");
    const label = language.charAt(0).toUpperCase() + language.slice(1);

    return (
      <CodeBlock
        marginTop="8"
        marginBottom="16"
        codes={[
          {
            code: children ?? "",
            language,
            label,
          },
        ]}
        copyButton={true}
      />
    );
  }

  // Fallback for other pre tags or empty code blocks
  return <pre {...props} />;
}

function createList(as: "ul" | "ol") {
  function MdxList({ children }: { children: ReactNode }) {
    return <List as={as}>{children}</List>;
  }
  MdxList.displayName = `MdxList(${as})`;
  return MdxList;
}

function createListItem({ children }: { children: ReactNode }) {
  return (
    <ListItem marginTop="4" marginBottom="8" style={{ lineHeight: "175%" }}>
      {children}
    </ListItem>
  );
}

function createHR() {
  return (
    <Row fillWidth horizontal="center">
      <Line maxWidth="40" />
    </Row>
  );
}

// MDX hands every intrinsic element the loose HTML props, while these
// components declare narrower props, so the map is typed as what MDXRemote accepts.
type MdxComponent = React.ComponentType<React.PropsWithChildren<Record<string, unknown>>>;

const components = {
  p: createParagraph as MdxComponent,
  h1: createHeading("h1") as MdxComponent,
  h2: createHeading("h2") as MdxComponent,
  h3: createHeading("h3") as MdxComponent,
  h4: createHeading("h4") as MdxComponent,
  h5: createHeading("h5") as MdxComponent,
  h6: createHeading("h6") as MdxComponent,
  // createImage and CustomLink require src / href, which MDX always supplies.
  img: createImage as unknown as MdxComponent,
  a: CustomLink as unknown as MdxComponent,
  code: createInlineCode as MdxComponent,
  pre: createCodeBlock as MdxComponent,
  ol: createList("ol") as MdxComponent,
  ul: createList("ul") as MdxComponent,
  li: createListItem as MdxComponent,
  hr: createHR as MdxComponent,
  Heading,
  Text,
  CodeBlock,
  InlineCode,
  Accordion,
  AccordionGroup,
  Table,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      options={{
        blockJS: false,
        // Math between $$ and $$ (inline or on its own lines), rendered with KaTeX
        // at build time. Single dollars stay plain text, so prices are safe.
        mdxOptions: {
          remarkPlugins: [[remarkMath, { singleDollarTextMath: false }]],
          rehypePlugins: [rehypeKatex],
        },
      }}
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
