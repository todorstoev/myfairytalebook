import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { config, animated, useSpring } from 'react-spring';
import Layout from '../components/layout';
import GridItem from '../components/grid-item';
import SEO from '../components/SEO';
import { ChildImageSharp } from '../types';

type PageProps = {
	data: {
		books: {
			nodes: {
				title: string;
				slug: string;
				cover: ChildImageSharp;
			}[];
		};
	};
};

const Area = styled(animated.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 50vw;
  @media (max-width: ${(props) => props.theme.breakpoints[2]}) {
    grid-template-columns: 1fr;
    grid-auto-rows: 60vw;
  }
`;

const Books: React.FunctionComponent<PageProps> = ({ data: { books } }) => {
	const pageAnimation = useSpring({
		config: config.slow,
		from: { opacity: 0 },
		to: { opacity: 1 }
	});

	return (
		<Layout color="#000">
			<SEO title="Projects | Jodie" />
			<Area style={pageAnimation}>
				{books.nodes.map((book) => (
					<GridItem key={book.slug} to={book.slug} aria-label={`View project "${book.title}"`}>
						<Img fluid={book.cover.childImageSharp.fluid} />
						<span>{book.title}</span>
					</GridItem>
				))}
			</Area>
		</Layout>
	);
};

export default Books;

export const query = graphql`
	query Books {
		books: allBooksYaml {
			nodes {
				title
				slug
				cover {
					childImageSharp {
						fluid(quality: 95, maxWidth: 1200) {
							...GatsbyImageSharpFluid_withWebp
						}
					}
				}
			}
		}
	}
`;
