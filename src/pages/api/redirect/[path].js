// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default ({ query: { path } }, res) => {
  res.redirect(`${path}`)
}
