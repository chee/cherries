<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <xsl:variable name="title"><xsl:value-of select="/rss/channel/title" /></xsl:variable>
    <xsl:variable name="description"><xsl:value-of select="/rss/channel/description" /></xsl:variable>
    <xsl:variable name="link"><xsl:value-of select="/rss/channel/link" /></xsl:variable>
  <html style="height: 100%">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="referrer" content="unsafe-url" />
    <title><xsl:value-of select="$title" /></title>
  </head>
  <body style="background: #fcda40; height: 100%; font-family: monospace">
    <h1>chee.party rss feed</h1>
    <p>subscribe using a news reader</p>
      <section>
        <xsl:choose>
          <xsl:when test="/rss/channel/item">
            <xsl:for-each select="/rss/channel/item">
              <article>
            
                    <xsl:if test="title">
                      <h2>
                      <a
                        href="{link}"
                        target="_blank"
                        rel="noopener noreferrer"
                         style="color: black"
                      >
                        <xsl:value-of select="title" disable-output-escaping="yes" />
                        </a>
                      </h2>
                    </xsl:if>

                    <xsl:if test="pubDate">
                      <time>
                        <xsl:value-of select="pubDate" />
                      </time>
                    </xsl:if>
                  
                  <div>
                    <p>
                      <xsl:choose>
                        <xsl:when test="description">
                          <xsl:value-of select="description" disable-output-escaping="yes" />
                        </xsl:when>
                      </xsl:choose>
                    </p>
                     <a
                      style="color: black"
                        href="{link}"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        read on-line
                      </a>
                  </div>
                
              </article>
            </xsl:for-each>
          </xsl:when>
          <xsl:when test="/atom:feed/atom:entry">
            <xsl:for-each select="/atom:feed/atom:entry">
              <article>
                <details>
                  <summary>
                    <xsl:if test="atom:title">
                      <h2>
                        <xsl:value-of select="atom:title" disable-output-escaping="yes" />
                      </h2>
                    </xsl:if>
                    <xsl:if test="atom:updated">
                      <time>
                        <xsl:value-of select="atom:updated" />
                      </time>
                    </xsl:if>
                  </summary>
                  <div>
                    <p>
                      <xsl:choose>
                        <xsl:when test="atom:summary">
                          <xsl:value-of select="atom:summary" disable-output-escaping="yes" />
                        </xsl:when>
                        <xsl:when test="atom:content">
                          <xsl:value-of select="atom:content" disable-output-escaping="yes" />
                        </xsl:when>
                      </xsl:choose>
                    </p>
                    <xsl:if test="atom:link/@href">
                      <a
                    >
                        href="{atom:link/@href}"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read More
                      </a>
                    </xsl:if>
                  </div>
                </details>
              </article>
            </xsl:for-each>
          </xsl:when>
        </xsl:choose>
      </section>
 
  </body>
</html>
</xsl:template>
</xsl:stylesheet>