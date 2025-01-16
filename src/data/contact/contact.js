import telegramLogo from '../../data/logos/telegram.svg'
import instagramLogo from '../../data/logos/instagram.svg'
import facebookLogo from '../../data/logos/facebook.svg'
import xLogo from '../../data/logos/x.svg'
import youtubeLogo from '../../data/logos/youtube.svg'

const contactInfo = {
  Address: '123 Street, New York, USA',
  PhoneNumber: '+998995186261',
  Mail: 'info@example.com',
  Links: {
    instagram: { link: 'https://t.me/ItsNoWonder', logo: instagramLogo },
    telegram: { link: 'https://t.me/ItsNoWonder', logo: telegramLogo },
    facebook: { link: 'https://t.me/ItsNoWonder', logo: facebookLogo },
    x: { link: 'https://t.me/ItsNoWonder', logo: xLogo },
    youtube: { link: 'https://t.me/ItsNoWonder', logo: youtubeLogo }
  }
}

export default contactInfo
