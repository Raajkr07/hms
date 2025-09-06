import {
  ActionIcon,
  Group,
  Text,
  useMantineColorScheme,
  Container,
} from '@mantine/core';
import { Heart } from 'lucide-react';
import {
  IconBrandX,
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandYoutube,
  IconBrandSlack,
  IconBrandNotion,
} from '@tabler/icons-react';

const socialLinks = [
  { Icon: IconBrandX, href: 'https://x.com/', label: 'X' },
  { Icon: IconBrandLinkedin, href: 'https://linkedin.com/', label: 'LinkedIn' },
  { Icon: IconBrandGithub, href: 'https://github.com/', label: 'GitHub' },
  { Icon: IconBrandYoutube, href: 'https://youtube.com/', label: 'YouTube' },
  { Icon: IconBrandSlack, href: 'https://slack.com/', label: 'Slack' },
  { Icon: IconBrandNotion, href: 'https://notion.so/', label: 'Notion' },
];

export default function Footer() {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const iconBaseColor = dark ? 'text-gray-400' : 'text-gray-500';

  return (
    <footer className="w-full border-t px-4">
      <Container
        size="lg"
        className="flex flex-col md:flex-row items-center justify-between py-6 gap-y-4 md:gap-y-0"
      >
        <Text
          className={`text-sm sm:text-base text-center md:text-left text-white`}
        >
          © {new Date().getFullYear()} HopeMeds.
        </Text>

        <Group
          spacing="xl"
          className="flex-row flex-wrap items-center justify-center my-3 md:my-0"
        >
          {/* Terms of Service */}
          <a
            href="/terms"
            className={`
              mr-4 font-medium
              ${dark ? 'text-gray-400' : 'text-gray-700'}
              no-underline
              transition-shadow duration-300
              hover:text-blue-400 dark:hover:text-white
              focus:text-blue-400 dark:focus:text-white
              focus:outline-none focus:ring-0
            `}
          >
            Terms of Service
          </a>

          {/* Privacy Policy */}
          <a
            href="/privacy"
            className={`
              mr-6 font-medium
              ${dark ? 'text-gray-400' : 'text-gray-700'}
              no-underline
              transition-shadow duration-300
              hover:text-blue-400 dark:hover:text-white
              focus:text-blue-400 dark:focus:text-white
              focus:outline-none focus:ring-0
            `}
          >
            Privacy Policy
          </a>

          {/* Social Icons */}
          <Group
            spacing={0}
            className="flex flex-wrap items-center justify-center"
          >
            {socialLinks.map(({ Icon, href, label }, i) => (
              <ActionIcon
                aria-label={label}
                size="lg"
                key={label}
                component="a"
                href={href}
                target="_blank"
                title={label}
                variant="subtle"
                className={`
                  ${iconBaseColor}
                  transition-shadow duration-300
                  hover:text-blue-400
                  hover:shadow-[0_0_10px_3px_rgba(59,130,246,0.35)]
                  focus:text-blue-400
                `}
                style={{
                  marginRight: i !== socialLinks.length - 1 ? '0.35rem' : 0,
                }}
              >
                <Icon
                  size={22}
                  stroke={1.5}
                  className="transition-transform duration-100 hover:scale-110"
                />
              </ActionIcon>
            ))}
          </Group>
        </Group>

        {/* Right: Made with love */}
        <span
          className="flex items-center text-sm sm:text-base"
          style={{ fontFamily: 'merriweather, serif' }}
        >
          Made with
          <Heart className="mx-1 w-4 h-4 text-red-500 fill-red-500" />
          for people
        </span>
      </Container>
    </footer>
  );
}