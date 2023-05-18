import axios from "axios";

export default async function handler(req, res) {
  const { query, page = 1 } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const pageSize = 12;

  if (!query || query === "") {
    return res
      .status(404)
      .json({
        error: "No search query. Please provide a valid query and try again.",
      });
  }

  try {
    const params = {
      apiKey,
      pageSize,
      page,
      q: query,
    };

    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params,
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch news articles. Please try again later.",
    });
  }
}
