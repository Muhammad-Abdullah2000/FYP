import React from 'react';
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsGithub, BsTwitter, BsDribbble } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div>
          <div className=''>
            <Link to='/' className='self-center whitespace-nowrap text-lg sm:text-lg font-semibold dark:text-white'>
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Ponder</span>
              Insight
            </Link>
          </div>

          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup>
                <Footer.Link
                  href='/about'
                  target='_blank'
                >
                  Ponder Insight
                </Footer.Link>

                <Footer.Link
                  href='#'
                  target='_blank'
                >
                  Muhammad Abdullah
                </Footer.Link>

                <Footer.Link
                  href='#'
                  target='_blank'
                >
                  Muhammad Ahmad
                </Footer.Link>

                <Footer.Link
                  href='#'
                  target='_blank'
                >
                  Khizar Shah
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title='Follow Us On' />
              <Footer.LinkGroup>
                <Footer.Link
                  href='#'
                  target='_blank'
                >
                  Github
                </Footer.Link>

                <Footer.Link
                  href='#'
                  target='_blank'
                >
                  Instagram
                </Footer.Link>

                <Footer.Link
                  href='#'
                  target='_blank'
                >
                  Facebook
                </Footer.Link>

                <Footer.Link
                  href='#'
                  target='_blank'
                >
                  Discord
                </Footer.Link>

              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup>
                <Footer.Link
                  href='/projects'
                  target='_blank'
                >
                  Privacy Policy
                </Footer.Link>

                <Footer.Link
                  href='/projects'
                  target='_blank'
                >
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>

        </div>
        <Footer.Divider />
        <div className='h-20 flex items-center justify-center flex-col gap-5'>
          <Footer.Copyright href='#' by='Ponder Insight' year={new Date().getFullYear()} />
          <div className='flex gap-6 mt-8 sm:mt-0 sm:justify-center'>
            <Footer.Icon href='https://www.facebook.com/' icon={BsFacebook} />
            <Footer.Icon href='https://www.instagram.com/' icon={BsInstagram} />
            <Footer.Icon href='https://twitter.com/?lang=en' icon={BsTwitter} />
            <Footer.Icon href='https://github.com/' icon={BsGithub} />
            <Footer.Icon href='https://dribbble.com/' icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  )
}
