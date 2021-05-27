# Douglas College API

This is my **read-only API** for [Douglas College's courses](https://www.douglascollege.ca/). The problem with the college is that it is not possible to make use of their public courses data due to its poor markup. The goal here is to make their courses data more accessible for other developers so they can derive more value from the data.

## Possible use cases:

- Course scheduling (e.g. [time reduction](https://dl.acm.org/doi/10.1145/1099435.1099503), schedule courses to share classes with friends)
- See trends in course selections and other data mining activites (e.g. course drop out rates, professor bias)
- Calendar generation and automatic retreival of course materials

## Roadmap:

- [X] Create a REST API using Strapi (with public read-only routes)
- [X] Create course data scrapers
- [ ] Create a data generation function to fill Strapi with data
- [ ] Create a scheduling mechanism to replace all records in Strapi with fresh data from scrapers
- [ ] Enable GraphQL on Strapi and set up rate limiting
- [ ] Deploy on a remote server
- [ ] Create add support for exam schedules
- [ ] Create Professor model (e.g. name, email, courses, sections)
- [ ] Create Club model (e.g. title, description, contact)
- [ ] Optimization: create a data comparison algorithm for local (scraper) data and remote (Strapi) data (i.e. replace stale data with fresh data) 

Note: we could do much more if it was only in scope to read private student data. We want to avoid that scenario because there's risk of mishandling student credentials