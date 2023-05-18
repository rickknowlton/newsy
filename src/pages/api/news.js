import axios from "axios";

export default async function handler(req, res) {
  const { country, page = 1, query = "" } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const pageSize = 15;

  try {
    const params = {
      apiKey,
      pageSize,
      page,
      country,
      q: query,
    };

    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params,
    });

    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Failed to fetch news articles. Please try again later.",
      });
  }
}
