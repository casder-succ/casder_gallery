import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Box, Divider, Loader, Stack, Text, Title } from '@mantine/core';

import { imageApi } from 'resources/image';
import { useEffect, useState } from 'react';

let date: null | number = null;

const Picture: NextPage = () => {
  const [slides, setSlides] = useState([]);
  const [progress, setProgress] = useState(10_000);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { id } = useRouter().query;

  const { data: image, isLoading } = imageApi.useGet(id as string);

  useEffect(() => {
    // @ts-ignore
    if (!window.viewer && image) {
      // @ts-ignore
      window.window.viewer = window.OpenSeadragon({
        id: 'openseadragon',
        prefixUrl: `${image.directory}/`,
        tileSources: image.tileSource,
        zoomPerClick: 0,
      });
    }

    return () => {
      // @ts-ignore
      window.viewer?.destroy();
      // @ts-ignore
      window.viewer = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  useEffect(() => {
    if (image?.scenes) {
      setSlides(image.scenes);
    }
  }, [image]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      } else {
        setCurrentSlide(0);
      }

      setProgress(10_000);
    }, 10_000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSlide, slides.length]);

  useEffect(() => {
    // @ts-ignore
    if (window.viewer && slides[currentSlide]) {
      setTimeout(() => {
        const { zoom, coordinates } = slides[currentSlide];

        // @ts-ignore
        window.viewer.viewport.zoomTo(
          zoom,
          // @ts-ignore
          new window.OpenSeadragon.Point(coordinates.coordinates.x, coordinates.coordinates.y),
        );
      }, 1000);
    }
  }, [currentSlide, slides]);

  useEffect(() => {
    date = Date.now();

    const interval = setInterval(() => {
      // @ts-ignore
      setProgress(progress - (Date.now() - date));
      date = Date.now();
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [progress]);

  if (isLoading || !image) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Gallery</title>
      </Head>

      <Stack sx={{
        height: '100%',
        padding: 100,
      }}
      >
        <Stack align="center">
          <Title>
            {image.title}
          </Title>

          <Text>
            {image.description}
          </Text>

          <Divider />

          <Box
            sx={{
              position: 'relative',
              width: '100%',
            }}
          >
            <Box
              id="openseadragon"
              sx={{
                height: 500,
                width: 800,
              }}
            />

            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: '#0B5351',
                color: 'white',
                borderRadius: 10,
                padding: 10,
                width: 400,
              }}
            >
              {/* @ts-ignore */}
              {slides[currentSlide]?.text}

              <Box
                style={{
                  width: 380,
                  height: '20px',
                  borderRadius: 10,
                }}
              >
                <Box
                  style={{
                    width: `${progress / 100}%`,
                    height: '100%',
                    borderRadius: 10,
                    backgroundColor: 'white',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default Picture;
